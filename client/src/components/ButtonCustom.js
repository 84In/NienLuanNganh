import React, { memo } from 'react';

const ButtonCustom = ({
  TypeButton,
  IconBefore,
  Image,
  ImageSize,
  TextTitle,
  PaddingX,
  Width,
  TextColor,
  FontWeight,
  HoverColor,
  Padding,
  IconSize,
}) => {
  return (
    <div
      className={`${PaddingX ? PaddingX : 'px-2'} ${FontWeight ? FontWeight : 'font-normal'} ${
        Width ? Width : 'w-auto'
      } ${HoverColor ? HoverColor : 'hover:bg-gray-500'} ${Padding ? Padding : 'p-2'}  rounded-md`}
    >
      <button
        type={TypeButton || 'button'}
        className={` ${
          TextColor ? TextColor : 'text-gray-800'
        } flex justify-center items-center gap-1 relative`}
      >
        {IconBefore && (
          <span>
            <IconBefore size={IconSize || '24'} />
          </span>
        )}
        {Image && (
          <img
            src={Image}
            alt={TextTitle}
            className={
              ImageSize ? `w-${ImageSize} h-${ImageSize} object-contain` : 'w-8 h-8 object-contain'
            }
          />
        )}
        <span className="text-left">{TextTitle}</span>
      </button>
    </div>
  );
};

export default memo(ButtonCustom);
