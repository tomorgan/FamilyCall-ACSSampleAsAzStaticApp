// © Microsoft Corporation. All rights reserved.
import React from 'react';

import { Stack, PrimaryButton, Image, IImageStyles } from '@fluentui/react';
import { VideoCameraEmphasisIcon } from '@fluentui/react-icons-northstar';
import heroSVG from '../assets/hero.svg';
import {
  imgStyle,
  containerTokens,

  headerStyle,
  upperStackTokens,
  videoCameraIconStyle,
  buttonStyle,

  upperStackStyle
} from './styles/HomeScreen.styles';


export interface HomeScreenProps {
  startCallHandler(): void;  
}

const imageStyleProps: IImageStyles = {
  image: {
    height: '100%',
    width: '100%'
  },
  root: {}
};

export default (props: HomeScreenProps): JSX.Element => {
  
  const imageProps = { src: heroSVG.toString() };
  const headerTitle = 'The Family Video Call';
  const startCallButtonText = 'Let\'s go';
 
  
  return (
    <Stack horizontal horizontalAlign="center" verticalAlign="center" tokens={containerTokens}>
      <Stack className={upperStackStyle} tokens={upperStackTokens}>
        <div className={headerStyle}>{headerTitle}</div>
        {/* <input type="text" id="entry-code" value={entrycode} /> */}
        
       
        <PrimaryButton className={buttonStyle} onClick={props.startCallHandler}>
          <VideoCameraEmphasisIcon className={videoCameraIconStyle} size="medium" />
          {startCallButtonText}
        </PrimaryButton>
      </Stack>
      <Image
        alt="Welcome to the ACS Calling sample app"
        className={imgStyle}
        styles={imageStyleProps}
        {...imageProps}
      />
    </Stack>
  );
};
