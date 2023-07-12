import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from "react";

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [serverInfo, setServerInfo] = useState({});

  useEffect(() => {

      const url = 'https://concierge-ai-app.onrender.com/server-info';

      const options = {
          method: 'GET',
      };

      fetch(url, options)
          .then(res => res.json())
          .then(json => setServerInfo(json))
          .catch(err => {
              console.error(err)
              setServerInfo({})
          });

  }, [])

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Monthly Active Users" total={1229} icon={'ant-design:team-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total users" total={10420} color="info" icon={'ant-design:user-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Estimated Revenue" total={123000} color="warning" icon={'ant-design:dollar-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tokens Used" total={serverInfo.usedTokens ? serverInfo.usedTokens : "0"} color="error" icon={'ant-design:tags-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Chat Usage"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },

              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Request Usage"
              chartData={[
                { label: 'Room service', value: 4344 },
                { label: 'General info', value: 5435 },
                { label: 'Bell boy', value: 1443 },
                { label: 'Reservations', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>





        </Grid>
      </Container>
    </>
  );
}
