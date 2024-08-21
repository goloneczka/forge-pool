import React from 'react';
import { Textfield, DatePicker, useConfig, RadioGroup } from '@forge/react';
import defaultConfig  from './config';

const ConfigMacro = () => {

    const config = useConfig() || defaultConfig;
  
    return (
      <>
        <Textfield name="name" label="Questionare Name" defaultValue={defaultConfig.name} isRequired="true" />
        <RadioGroup  name="isMultiple" label="Multiple Answers Enable" 
                      options={[{ value: 'true', label: 'True' }, {value: 'false', label: 'False' }]}
                      defaultValue={defaultConfig.isMultiple}
                      isRequired="true"/>
  
        <RadioGroup name="isPrivate" label="Should Display User votes" 
                      options={[{ value: 'true', label: 'True' }, {value: 'false', label: 'False' }]}
                      defaultValue={defaultConfig.isPrivate} isRequired="true" />
  
        <DatePicker name="endTime" label="End Day" defaultValue={defaultConfig.endTime} isRequired="true" />
  
        <Textfield name="question_0" label="St value" defaultValue={defaultConfig.question_0} isRequired="true"/>
        <Textfield name="question_1" label="Nd value" defaultValue={defaultConfig.question_1} isRequired="true" />
        <Textfield name="question_2" label="Td value" defaultValue={defaultConfig.questions_2} placeholder='Left empty if dont neednt'/>
        <Textfield name="question_3" label="Fourth value" defaultValue={defaultConfig.questions_3} placeholder='Left empty if dont neednt'/>
        <Textfield name="question_4" label="Fifth value" defaultValue={defaultConfig.questions_4} placeholder='Left empty if dont neednt'/>
        <Textfield name="question_5" label="Sixth value" defaultValue={defaultConfig.questions_5} placeholder='Left empty if dont neednt'/>
        <Textfield name="question_6" label="Seventh value" defaultValue={defaultConfig.questions_6} placeholder='Left empty if dont neednt'/>
        <Textfield name="question_7" label="Eighth value" defaultValue={defaultConfig.questions_7} placeholder='Left empty if dont neednt'/>
        <Textfield name="question_8" label="Ninth value" defaultValue={defaultConfig.questions_8} placeholder='Left empty if dont neednt'/>

        <RadioGroup name="isClearVotesOnEmptyValue" label="Should clear votes on empty value" 
                      options={[{ value: 'true', label: 'True' }, {value: 'false', label: 'False' }]}
                      defaultValue={defaultConfig.isClearVotesOnEmptyValue} isRequired="true" />
  
      </>
    );
  };

  export default ConfigMacro;