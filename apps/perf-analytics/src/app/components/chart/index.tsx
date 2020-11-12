import React, { useEffect, useRef, useState } from 'react';
import { useEnv } from '../../hooks';
import useFetch from 'use-http';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../card';

interface Props {
  vitalShortCode: string;
  startDate: number;
}

const Chart: React.FC<Props> = ({ vitalShortCode, startDate }) => {
  const url = useEnv('api');
  const { get, response, loading } = useFetch(url);
  const [vitals, setVitals] = useState([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchVitals();
  }, []);

  const fetchVitals = async () => {
    const items = await get(`/vitals/all?type=${vitalShortCode}&startDate=${startDate}`);
    if (response.ok) setVitals(items.vitals);
  };

  const getChartWidth = () => {
    if (!cardRef.current) return 0;
    const el = cardRef.current;
    const style = window.getComputedStyle ? getComputedStyle(el, null) : el['currentStyle'];

    const paddingLeft = parseInt(style.paddingLeft) || 0;
    const paddingRight = parseInt(style.paddingRight) || 0;
    return el.clientWidth - (paddingLeft + paddingRight);
  };

  return (
    <Card ref={cardRef}>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <h3 className="text-center">{vitalShortCode}</h3>
          <ResponsiveContainer aspect={2}>
            <LineChart
              width={getChartWidth()}
              height={450}
              data={vitals}
              margin={{ top: 5, right: 50, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="shortCode" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="startTime" stroke="#8884d8" activeDot={{ r: 8 }} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </Card>
  );
};

export default Chart;
