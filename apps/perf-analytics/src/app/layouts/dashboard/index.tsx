import React from 'react';
import Chart from '../../components/chart';
import Container from '../../components/container';
import Row from '../../components/row';

interface Props {}

const vitals: string[] = ['TTFB', 'FCP', 'DOMLOAD', 'PAGELOAD'];
const date = new Date();
const lastThirtyMinutes = new Date().setMinutes(date.getMinutes() - 30).valueOf();

const Dashboard: React.FC<Props> = () => {
  return (
    <Container className="my-4">
      <Row>
        {vitals.map((vital) => (
          <div className="col-12 col-lg-6 mb-3" key={vital}>
            <Chart vitalShortCode={vital} startDate={lastThirtyMinutes} />
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
