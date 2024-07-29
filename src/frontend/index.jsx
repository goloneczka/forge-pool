import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Textfield, Text, SectionMessage, DatePicker , useConfig, RadioGroup, Stack, xcss, Box, Heading, Checkbox, Inline } from '@forge/react';
import { view } from '@forge/bridge';
import  colorMap  from './colors';
import defaultConfig  from './config';
import { invoke } from '@forge/bridge';

const Config = () => {

  return (
    <>
      <Textfield name="name" label="Questionare Name" defaultValue={defaultConfig.name} isRequired="true" />
      <RadioGroup  name="isMultiple" label="Multiple Answers Enable" options={[{ value: 'true', label: 'True' }, {value: 'false', label: 'False' }]}
                    defaultValue={defaultConfig.isMultiple} isRequired="true"/>

      <RadioGroup name="isPrivate" label="Should Display User votes" options={[{ value: 'true', label: 'True' }, {value: 'false', label: 'False' }]}
                    defaultValue={defaultConfig.isPrivate} isRequired="true" />

      <DatePicker name="endTime" label="End Day" defaultValue={defaultConfig.endTime} isRequired="true" />

      <Textfield name="question_0" label="St value" defaultValue={defaultConfig.question_0} isRequired="true"/>
      <Textfield name="question_1" label="Nd value" defaultValue={defaultConfig.question_1} isRequired="true" />
      <Textfield name="question_2" label="Td value" defaultValue={defaultConfig.questions_2} placeholder='Left empty if dont neednt'/>
      <Textfield name="question_3" label="Fourth value" defaultValue={defaultConfig.questions_3} placeholder='Left empty if dont neednt'/>
      <Textfield name="question_4" label="Fifth value" defaultValue={defaultConfig.questions_4} placeholder='Left empty if dont neednt'/>
      <Textfield name="question_5" label="Sixth value" defaultValue={defaultConfig.questions_5} placeholder='Left empty if dont neednt'/>
      <Textfield name="question_6" label="Seventh value" defaultValue={defaultConfig.questions_6} placeholder='Left empty if dont neednt'/>
      <Textfield name="question_7" label="Eight value" defaultValue={defaultConfig.questions_7} placeholder='Left empty if dont neednt'/>
      <Textfield name="question_8" label="Nineht value" defaultValue={defaultConfig.questions_8} placeholder='Left empty if dont neednt'/>

    </>
  );
};

const App = () => {
  const [context, setContext] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const config = useConfig() || defaultConfig;

  const [choices, setChoices] = useState([
    { id: 0, checkbox: {name: 'Checkbox0', isChecked: false}, question: ''},
    { id: 1, checkbox: {name: 'Checkbox1', isChecked: false}, question: ''},
    { id: 2, checkbox: {name: 'Checkbox2', isChecked: false}, question: ''},
    { id: 3, checkbox: {name: 'Checkbox3', isChecked: false}, question: ''},
    { id: 4, checkbox: {name: 'Checkbox4', isChecked: false}, question: ''},
    { id: 5, checkbox: {name: 'Checkbox5', isChecked: false}, question: ''},
    { id: 6, checkbox: {name: 'Checkbox6', isChecked: false}, question: ''},
    { id: 7, checkbox: {name: 'Checkbox7', isChecked: false}, question: ''},
    { id: 8, checkbox: {name: 'Checkbox8', isChecked: false}, question: ''},
    { id: 9, checkbox: {name: 'Checkbox9', isChecked: false}, question: ''}
  ]);
  
  useEffect(() => {
    view.getContext().then(setContext);
  }, [view]);

  useEffect(() => {
    view.getContext().then(setContext);
    invoke('getCurrentUser').then(setCurrentUser);
  }, [view]);

  useEffect(() => {
    if(context !== undefined && currentUser !== undefined) {
      console.log(currentUser);
      setChoices(_ => [
        { id: 0, checkbox: {name: 'Checkbox0', isChecked: false}, question: config.question_0},
        { id: 1, checkbox: {name: 'Checkbox1', isChecked: false}, question: config.question_1},
        { id: 2, checkbox: {name: 'Checkbox2', isChecked: false}, question: config.question_2},
        { id: 3, checkbox: {name: 'Checkbox3', isChecked: false}, question: config.question_3},
        { id: 4, checkbox: {name: 'Checkbox4', isChecked: false}, question: config.question_4},
        { id: 5, checkbox: {name: 'Checkbox5', isChecked: false}, question: config.question_5},
        { id: 6, checkbox: {name: 'Checkbox6', isChecked: false}, question: config.question_6},
        { id: 7, checkbox: {name: 'Checkbox7', isChecked: false}, question: config.question_7},
        { id: 8, checkbox: {name: 'Checkbox8', isChecked: false}, question: config.question_8},
        { id: 9, checkbox: {name: 'Checkbox9', isChecked: false}, question: config.question_9}
      ])
    }
  }, [context, config, currentUser]);

  const updateCheckboxValue = (id, val) => {
    setChoices(items => items.map(item => item.id == id ? {...item, checkbox: {...item.checkbox, isChecked: val}} : item));
  }
  
  const clearCheckboxesValue = () => {
    setChoices(items => items.map(item => ({...item, checkbox: {...item.checkbox, isChecked: false}})));
  }

  const onSelectCheckboxChange = (event) => {
    if(config.isMultiple === "false") {
      clearCheckboxesValue();
    }
    updateCheckboxValue(event.target.id, event.target.checked);
  }
  
  return (
    <>
      <Text>{config.name}, settings, multi: {config.isMultiple}, private: {config.isPrivate} </Text>

      {!config.name || !config.endTime || !choices[0].question || !choices[1].question ? (
        <SectionMessage title="You need to configure this macro" appearance="warning"> 
          <Text>
            While editing the page, select the macro, and click on the pencil icon
            to display configuration options.
          </Text>
        </SectionMessage>
      ) : (
        <Stack>
          <Heading as="h3">{config.name}</Heading>

            {choices.map((v, i) => {
              if (!v.question) return null;

              return (<React.Fragment key={i} >
                <Stack>
                  <Heading as="h5">{v.question}</Heading>

                  <Inline alignBlock="baseline" spread='space-between'>
                    <Inline space="space.200" alignBlock="center">
                      <Checkbox id={i}
                        name={v.checkbox.name}
                        isChecked={v.checkbox.isChecked}
                        onChange={onSelectCheckboxChange}> </Checkbox>

                      <Box xcss={{ width: '50px', height: '20px',  backgroundColor: colorMap.get(i) }}> </Box>
                    </Inline>
                    <Text >{i}</Text>
                  </Inline>

                </Stack>
              </React.Fragment>);
            })};
          </Stack>
      )}
    </>
  );
};

// Adding the Config function to the ForgeReconciler to allow for configuration changes
ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ForgeReconciler.addConfig(<Config />);