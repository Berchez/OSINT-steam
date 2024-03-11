import { useTranslations } from 'next-intl';
import React from 'react';

import { locationDataIWant } from '@/app/[locale]/usePage';

const LocationCard = ({
  providedLocation,
  possibleLocations,
}: {
  providedLocation: {
    cityName?: string;
    stateName?: string;
    countryName: string;
    countryCode: string;
  };
  possibleLocations?: locationDataIWant[];
}) => {
  const translator = useTranslations('LocationCard');

  const glassmorphism =
    'bg-purple-900 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100/50';

  return (
    <div className={`mt-8 text-white py-4 px-8 ${glassmorphism}`}>
      {providedLocation.countryCode && (
        <div className="flex gap-x-5">
          {translator('providedByUser')}
          <div className="flex items-center gap-x-2">
            <img
              src={`https://flagcdn.com/w20/${providedLocation.countryCode.toLowerCase()}.png`}
              className="w-max h-max"
            />
            {providedLocation.cityName && <p>{providedLocation.cityName},</p>}
            {providedLocation.stateName && <p>{providedLocation.stateName},</p>}
            {providedLocation.countryName && (
              <p>{providedLocation.countryName}</p>
            )}
          </div>
        </div>
      )}

      {possibleLocations &&
        possibleLocations.map((l) => {
          const { cityName, stateName, countryName, countryCode } = l.location;
          return (
            <div
              key={`${l.location.countryName}/${l.location.stateName}/${l.location.cityName}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-x-2">
                {countryCode && (
                  <img
                    src={`https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`}
                    className="w-max h-max"
                  />
                )}
                {cityName && <p>{cityName},</p>}
                {stateName && <p>{stateName},</p>}
                {countryName && <p>{countryName}</p>}
              </div>
              <div className="flex gap-x-1">
                {l.probability.toFixed(2)}%
                <p className="text-xs self-end justify-end">({l.count})</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default LocationCard;