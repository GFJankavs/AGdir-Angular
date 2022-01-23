import {MatTableDataSource} from "@angular/material/table";

export type Weather = {
  time: string,
  data: {
  instant: {
    details: {
      air_pressure_at_sea_level: number,
        air_temperature: number,
        air_temperature_percentile_10: number,
        air_temperature_percentile_90: number,
        cloud_area_fraction: number,
        cloud_area_fraction_high: number,
        cloud_area_fraction_low: number,
        cloud_area_fraction_medium: number,
        dew_point_temperature: number,
        fog_area_fraction: number,
        relative_humidity: number,
        ultraviolet_index_clear_sky: number,
        wind_from_direction: number,
        wind_speed: number,
        wind_speed_of_gust: number,
        wind_speed_percentile_10: number,
        wind_speed_percentile_90: number
    },
    next_12_hours: {
      summary: {
        symbol_code: string,
      }
    },
    next_1_hours: {
      summary: {
        symbol_code: string,
      },
      details: {
        "precipitation_amount": number,
      }
    },
    next_6_hours: {
      summary: {
        symbol_code: string,
      },
      details: {
        air_temperature_max: number,
        air_temperature_min: number,
        precipitation_amount: number,
      }
    }
  }
}
};

interface WeatherJSON {
  type: string;
  geometry: {
    type: string;
    coordinates: number[]
  },
  properties: {
    meta: {
      updated_at: string,
      units: {
        air_pressure_at_sea_level: string,
        air_temperature: string,
        air_temperature_max: string,
        air_temperature_min: string,
        air_temperature_percentile_10: string,
        air_temperature_percentile_90: string,
        cloud_area_fraction: string,
        cloud_area_fraction_high: string,
        cloud_area_fraction_low: string,
        cloud_area_fraction_medium: string,
        dew_point_temperature: string,
        fog_area_fraction: string,
        precipitation_amount: string,
        precipitation_amount_max: string,
        precipitation_amount_min: string,
        probability_of_precipitation: string,
        probability_of_thunder: string,
        relative_humidity: string,
        ultraviolet_index_clear_sky: string,
        wind_from_direction: string,
        wind_speed: string,
        wind_speed_of_gust: string,
        wind_speed_percentile_10: string,
        wind_speed_percentile_90: string
      }
    },
    timeseries: Weather[]
  }
}

export interface InfoType {
  coordinates: {
    lat: string,
    lon: string,
  },
  data: MatTableDataSource<Weather>;
}

interface WeatherDataSingle {
  time: string,
  air_temperature: string,
  relative_humidity: string,
}

export type WeatherDataType = {
  time: string,
  air_temperature: string,
  relative_humidity: string
};

export default WeatherJSON;
