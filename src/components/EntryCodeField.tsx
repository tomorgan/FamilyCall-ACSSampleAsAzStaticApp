import React from 'react';
import { TextField } from '@fluentui/react';

import {
  inputBoxStyle,
  inputBoxTextStyle,
  inputBoxWarningStyle,
  labelFontStyle,
  warningStyle
} from './styles/Configuration.styles';

interface EntryCodeFieldProps {
  setCode(name: string): void;
  code: string;
  setEmptyWarning(isEmpty: boolean): void;
  isEmpty: boolean;
}

const TextFieldStyleProps = {
  root: {
    height: 'auto'
  }
};

export default (props: EntryCodeFieldProps): JSX.Element => {
  const onEntryCodeChange = (event: any) => {
    props.setCode(event.target.value);
    if (event.target.value) {
      props.setEmptyWarning(false);
    } else {
      props.setEmptyWarning(true);
    }
  };

  return (
    <div>
      <div className={labelFontStyle}>Name</div>
      <TextField
        autoComplete="off"
        inputClassName={inputBoxTextStyle}
        ariaLabel="Entry Code"
        borderless={true}
        className={props.isEmpty ? inputBoxWarningStyle : inputBoxStyle}
        onChange={onEntryCodeChange}
        id="code"
        placeholder="Entry Code"
        defaultValue={props.code}
        styles={TextFieldStyleProps}
      />
      {props.isEmpty && (
        <div role="alert" className={warningStyle}>
          {' '}
          Entry Code cannot be empty{' '}
        </div>
      )}
    </div>
  );
};
