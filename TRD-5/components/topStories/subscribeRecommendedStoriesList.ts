import { IrecommendedStories } from '../../graphql';

export const TrdMarkets = new Map([
    [undefined, '8af843082d662a44ce64f9683dd0ce535320a2a2'],
    ['chicago', '3b60085e28ecd636882038fb189c60b0da41ed0f'],
    ['data', '8af843082d662a44ce64f9683dd0ce535320a2a2'],
    ['events', '8af843082d662a44ce64f9683dd0ce535320a2a2'],
    ['la', 'c03a4590c00a35b8867086d9ba2ace5d4766c9e5'],
    ['national', '142ce5f55b59ec0842bf6b7265fd888b0baaa23d'],
    ['ny', '2a5aa8c13621905f86272ca2573c4914edbfa197'],
    ['sanfrancisco', '72fd5f7338ee25ca6ece9b678fde82127da6daad'],
    ['miami', 'ba0b533a35b5091c9e59e99d774bb0effd698b9c'],
    ['texas', '2faddc1eed7dc07af0464665161de337b73cb167'],
    ['tristate', '8af843082d662a44ce64f9683dd0ce535320a2a2'],
]);

declare global {
    interface Window {
        cX: any;
    }
}

export const subscribeRecommendedStoriesList = (
  widgetName: undefined | string,
  onDataFetch: (res: any) => void,
) => {
    const mapPianoItems = (item: IrecommendedStories) => ({
        link: item.url,
        title: item.title,
        markets: [],
    });

    let attemptCount = 0;

    // check if cx is loaded to perform this action
    // TODO: find better solution for this (maybe load script in sync way?)
    const timer = setInterval(() => {
        window?.cX?.CCE?.run(
          {
              widgetId: TrdMarkets.get(widgetName),
          },
          undefined,
          (res: any) => {
              const items = res.response.items.map(mapPianoItems);
              clearInterval(timer);
              onDataFetch(items);
          },
        );

        attemptCount += 1;

        if (attemptCount > 5) {
            clearInterval(timer);
        }
    }, 500);
};
