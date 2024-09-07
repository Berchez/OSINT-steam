import { useTranslations } from 'next-intl';
import React from 'react';
import { UserSummary } from 'steamapi';
import { getLocationDetails } from '@/app/templates/Home/useHome';

const UserCard = ({
  friend,
  count,
  probability,
  itsTargetUser,
}: {
  friend: UserSummary;
  count?: number;
  probability?: number;
  itsTargetUser: boolean;
}) => {
  const { countryCode, stateCode, cityID } = friend;

  const translator = useTranslations('UserCard');

  const { country, state, city } = getLocationDetails(
    countryCode,
    stateCode,
    cityID,
  );

  const glassmorphism =
    'bg-purple-900 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100/50';

  return (
    <div
      className={`mt-8 gap-4 flex md:flex-row flex-col items-center justify-center text-white p-4 ${
        itsTargetUser
          ? 'text-lg md:w-[90%] w-full self-center'
          : 'text-base w-full'
      } ${glassmorphism}`}
      key={friend.steamID}
    >
      {friend.avatar.medium && (
        <div>
          <img
            src={itsTargetUser ? friend.avatar.large : friend.avatar.medium}
            className={`${itsTargetUser ? 'w-36' : ''} rounded-lg`}
          />
        </div>
      )}
      <div
        className={`flex flex-col w-full break-words ${
          itsTargetUser && 'gap-y-2'
        }`}
      >
        {friend.nickname && (
          <p className="font-semibold">
            {translator('nickname')}: {friend.nickname}
          </p>
        )}
        {friend.realName && (
          <p>
            {translator('realName')}: {friend.realName}
          </p>
        )}
        <div className="flex gap-x-2 items-center">
          {friend.countryCode && (
            <div className="flex items-center gap-x-1">
              <img
                src={`https://flagcdn.com/${
                  itsTargetUser ? 'w40' : 'w20'
                }/${friend.countryCode.toLowerCase()}.png`}
                className="w-max h-max"
              />
              {city && `${city.name}, `}
              {state && `${state.name}, `}
              {country && `${country.name}`}
            </div>
          )}
        </div>
        {probability && (
          <p className="">
            {translator('probability')}: {probability?.toFixed(2)}%
          </p>
        )}
        {friend.url && (
          <p>
            {translator('url')}:{' '}
            <a
              href={friend.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-600 hover:underline"
            >
              {friend.url}
            </a>
          </p>
        )}
        {count && (
          <p>
            {translator('reliability')}: {count}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
