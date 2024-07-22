import { Configuration, Speaker } from "../App.tsx";
import configurationsJson from "/public/configurations.json";

interface TempConfiguration {
  name: string;
  speakers: Array<Speaker>;
  bellTimes: [string, number][];
}

function LoadDefaultConfigurations(): Array<Configuration> {
  const tempConfigurations: TempConfiguration[] =
    configurationsJson.configurations;

  try {
    return tempConfigurations.map((config) => {
      return {
        ...config,
        bellTimes: new Map<number, number>(
          (
            Object.entries(config.bellTimes) as unknown as [string, number][]
          ).map(([key, value]) => [Number.parseInt(key), value]),
        ),
      } as Configuration;
    });
  } catch (error) {
    console.error(error);

    return new Array<Configuration>();
  }
}

export default LoadDefaultConfigurations;
