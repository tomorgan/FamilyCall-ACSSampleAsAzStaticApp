// © Microsoft Corporation. All rights reserved.

import React, { useEffect, useState } from 'react';
import { Stack, PrimaryButton } from '@fluentui/react';
import LocalPreview from './LocalPreview';
import LocalSettings from './LocalSettings';
import DisplayNameField from './DisplayNameField';
import {
  VideoDeviceInfo,
  AudioDeviceInfo,
  LocalVideoStream,
  DeviceManager,
  CallAgent
} from '@azure/communication-calling';
import { VideoCameraEmphasisIcon } from '@fluentui/react-icons-northstar';
import {
  videoCameraIconStyle,
  configurationStackTokens,
  buttonStyle,
  localSettingsContainerStyle,
  mainContainerStyle,
  fullScreenStyle,
  verticalStackStyle
} from './styles/Configuration.styles';
import EntryCodeField from './EntryCodeField';


export interface ConfigurationScreenProps {
  userId: string;
  groupIdPromise: Promise<string>;
  entryCode: string;
  callAgent: CallAgent;
  deviceManager: DeviceManager;
  setUserId(userId: string): void;
  initCallClient(userId: string, unsupportedStateHandler: () => void, endCallhandler: () => void): void;
  setGroup(groupId: string): void;
  startCallHandler(): void;
  unsupportedStateHandler: () => void;
  endCallHandler: () => void;
  videoDeviceList: VideoDeviceInfo[];
  audioDeviceList: AudioDeviceInfo[];
  setVideoDeviceInfo(device: VideoDeviceInfo): void;
  setAudioDeviceInfo(device: AudioDeviceInfo): void;
  setMic(mic: boolean): void;
  setLocalVideoStream(stream: LocalVideoStream | undefined): void;
  localVideoRendererIsBusy: boolean;
  videoDeviceInfo: VideoDeviceInfo;
  audioDeviceInfo: AudioDeviceInfo;
  localVideoStream: LocalVideoStream;
  screenWidth: number;
}

export default (props: ConfigurationScreenProps): JSX.Element => {
  //const spinnerLabel = 'Initializing call client...';
  const buttonText = 'Start call';
  const entryCodeButtonText = "Next";

  const [name, setName] = useState(props.userId);
  const [emptyWarning, setEmptyWarning] = useState(false);

  const [entryCode, setEntryCodeName] = useState(props.entryCode);
  const [emptyCodeWarning, setEmptyCodeWarning] = useState(false);
  

  const { userId, groupIdPromise, setUserId, initCallClient, setGroup, unsupportedStateHandler, endCallHandler } = props;

  useEffect(() => {
    setUserId(userId);
    groupIdPromise.then(res => {
  setGroup(res);
  console.log("Group ID is "  + res);
});   
   
  }, [userId, groupIdPromise, setUserId, initCallClient, setGroup, unsupportedStateHandler, endCallHandler]);

  return (
    <Stack className={mainContainerStyle} horizontalAlign="center" verticalAlign="center">
      {props.deviceManager ? (
        <Stack
          className={props.screenWidth > 750 ? fullScreenStyle : verticalStackStyle}
          horizontal={props.screenWidth > 750}
          horizontalAlign="center"
          verticalAlign="center"
          tokens={props.screenWidth > 750 ? configurationStackTokens : undefined}
        >
          <LocalPreview
            setMic={props.setMic}
            setLocalVideoStream={props.setLocalVideoStream}
            videoDeviceInfo={props.videoDeviceInfo}
            audioDeviceInfo={props.audioDeviceInfo}
            localVideoStream={props.localVideoStream}
          />
          <Stack className={localSettingsContainerStyle}>
            <DisplayNameField setName={setName} name={name} setEmptyWarning={setEmptyWarning} isEmpty={emptyWarning} />
            
            <div>
              <LocalSettings
                videoDeviceList={props.videoDeviceList}
                audioDeviceList={props.audioDeviceList}
                audioDeviceInfo={props.audioDeviceInfo}
                videoDeviceInfo={props.videoDeviceInfo}
                setVideoDeviceInfo={props.setVideoDeviceInfo}
                setAudioDeviceInfo={props.setAudioDeviceInfo}
              />
            </div>
            <div>
              <PrimaryButton
                className={buttonStyle}
                onClick={() => {
                  if (!name) {
                    setEmptyWarning(true);
                  } else {
                    setEmptyWarning(false);
                    props.setUserId(name);
                    props.callAgent.updateDisplayName(name);
                  //  initCallClient(entryCode, unsupportedStateHandler, endCallHandler);
                    props.startCallHandler();
                  }
                }}
              >
                <VideoCameraEmphasisIcon className={videoCameraIconStyle} size="medium" />
                {buttonText}
              </PrimaryButton>
            </div>
          </Stack>
        </Stack>
      ) : (
        // <Spinner label={spinnerLabel} ariaLive="assertive" labelPosition="top" />
        <Stack>
        <EntryCodeField setCode={setEntryCodeName} code={entryCode} setEmptyWarning={setEmptyCodeWarning} isEmpty={emptyCodeWarning} />
        <PrimaryButton
                className={buttonStyle}
                onClick={() => {
                  if (!entryCode) {
                    setEmptyCodeWarning(true);
                  } else {
                    setEmptyCodeWarning(false);
                    initCallClient(entryCode, unsupportedStateHandler, endCallHandler);                    
                  }
                }}
              >                
                {entryCodeButtonText}
              </PrimaryButton>
              </Stack>
      )}
     
    </Stack>
  );
};
