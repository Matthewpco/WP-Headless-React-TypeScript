import {
  client,
  getFooter,
  getHeader,
  getMainMenu,
  ResponseGetFooter,
  ResponseGetMainMenu,
  ResponseGetHeader,
  getStylesWp,
  getChartbeat,
  RequestGetChartbeat,
  ResponseGetChartbeat,
  ResponseGetStylesWp,
} from '../../graphql';

export interface BasePageProps {
  header: ResponseGetHeader;
  footer: ResponseGetFooter;
  mainMenu: ResponseGetMainMenu;
  stylesWp: ResponseGetStylesWp;
  chartbeat: ResponseGetChartbeat;
}

export const getBasePageProps = async (params: any): Promise<BasePageProps> => {
  const uri = Object.values(params)
    .filter((el) => !!el)
    .join('/');
  const [
    footerResponse,
    mainMenuResponse,
    headerResponse,
    stylesResponse,
    chartbeat,
  ] = await Promise.all([
    client.query<ResponseGetFooter>({
      query: getFooter,
    }),
    client.query<ResponseGetMainMenu>({
      query: getMainMenu,
    }),
    client.query<ResponseGetHeader>({
      query: getHeader,
    }),
    client.query<ResponseGetStylesWp>({
      query: getStylesWp,
    }),
    client.query<ResponseGetChartbeat, RequestGetChartbeat>({
      query: getChartbeat,
      variables: { uri },
    }),
  ]);

  return {
    footer: footerResponse?.data ?? null,
    mainMenu: mainMenuResponse?.data ?? null,
    header: headerResponse?.data ?? null,
    stylesWp: stylesResponse?.data ?? null,
    chartbeat: chartbeat?.data ?? null,
  };
};
