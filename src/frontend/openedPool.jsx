import React, { useEffect, useState, useRef  } from 'react';
import {  useConfig, Stack, xcss, Box, Heading, Checkbox, Inline, Tag, Button, Spinner } from '@forge/react';
import { view } from '@forge/bridge';
import  colorMap  from './colors';
import defaultConfig  from './config';
import { invoke } from '@forge/bridge';
import UsersVoteModal from './usersVoteModal';



const OpenedPool = () => {
  const [context, setContext] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isOpenModal, setOpenModal] = useState(false);
  const config = useConfig() || defaultConfig;
  const [choices, setChoices] = useState([]);
  const [modalData, setModalData] = useState({});
  const [isCompMounted, setCompMounted] = useState(false);

  useEffect(() => {
    view.getContext().then(setContext);
    invoke('getCurrentUser').then(setCurrentUser);
    // INIT MOCK DATA
    // invoke('initMockVotesData');
    // DELETE MOCK DATA
    // invoke('clearMockVoteskData');
  }, [view]);

  useEffect(() => {
    if(context !== undefined && currentUser !== undefined  && config !== undefined) {
      if(config.name && config.isClearVotesOnEmptyValue === "true"){
        invoke('clearVoutesOnEmptyQuestionValue', [!!config.question_0, !!config.question_1, !!config.question_2, !!config.question_3, !!config.question_4,!!config.question_5, !!config.question_6, !!config.question_7, !!config.question_8, !!config.question_9])
          .then(_ => { setChoicesOnInit();});
      } else {
        setChoicesOnInit();
      }  
    }
  }, [context, config, currentUser]);

  useEffect(() => {
    if(isCompMounted) {
      invoke('saveUserOutputs', choices.filter(it => it.checkbox.isChecked).map(it => it.id));
    }
  }, [choices]);

  const setChoicesOnInit = () => {
    Promise.all([invoke('getUserOutputs'), invoke('getAllOutputs')]).then(responses => {
      const userChoices = JSON.stringify(responses[0]) === '{}' ? [] : responses[0].outputs;
      const votes = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]]);
      responses[1].map(it => {it.value.outputs.map(v => votes.set(v, votes.get(v)+1))});
      const winningVotes = Math.max(...votes.values());
      setChoices(_ => [
        { id: 0, checkbox: {name: 'Checkbox0', isChecked: userChoices.includes(0)}, question: config.question_0, votes: votes.get(0), isWinning: winningVotes === votes.get(0)},
        { id: 1, checkbox: {name: 'Checkbox1', isChecked: userChoices.includes(1)}, question: config.question_1, votes: votes.get(1), isWinning: winningVotes === votes.get(1)},
        { id: 2, checkbox: {name: 'Checkbox2', isChecked: userChoices.includes(2)}, question: config.question_2, votes: votes.get(2), isWinning: winningVotes === votes.get(2)},
        { id: 3, checkbox: {name: 'Checkbox3', isChecked: userChoices.includes(3)}, question: config.question_3, votes: votes.get(3), isWinning: winningVotes === votes.get(3)},
        { id: 4, checkbox: {name: 'Checkbox4', isChecked: userChoices.includes(4)}, question: config.question_4, votes: votes.get(4), isWinning: winningVotes === votes.get(4)},
        { id: 5, checkbox: {name: 'Checkbox5', isChecked: userChoices.includes(5)}, question: config.question_5, votes: votes.get(5), isWinning: winningVotes === votes.get(5)},
        { id: 6, checkbox: {name: 'Checkbox6', isChecked: userChoices.includes(6)}, question: config.question_6, votes: votes.get(6), isWinning: winningVotes === votes.get(6)},
        { id: 7, checkbox: {name: 'Checkbox7', isChecked: userChoices.includes(7)}, question: config.question_7, votes: votes.get(7), isWinning: winningVotes === votes.get(7)},
        { id: 8, checkbox: {name: 'Checkbox8', isChecked: userChoices.includes(8)}, question: config.question_8, votes: votes.get(8), isWinning: winningVotes === votes.get(8)},
        { id: 9, checkbox: {name: 'Checkbox9', isChecked: userChoices.includes(9)}, question: config.question_9, votes: votes.get(9), isWinning: winningVotes === votes.get(9)}
      ]);
      setCompMounted(true);
    });
  };

  const onOpenModal = (choosenId) => {
    invoke('getOutputVouters', choosenId).then(data => {
      setModalData({userIds: data, question: choices[choosenId].question});
      setOpenModal(true);
    });
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const updateCheckboxValue = (id, val) => {
     let choicesShadow = choices.map(item => item.id == id ? {
        ...item,
        votes: val ? item.votes+1 : item.votes-1,
        checkbox: {...item.checkbox, isChecked: val}
      } : {...item}
    );

    const votes = new Map(choicesShadow.map(it => [it.id, it.votes]));
    const newWinningVotes = Math.max(...votes.values());
    choicesShadow = choicesShadow.map(it => ({...it, isWinning: votes.get(it.id) === newWinningVotes }));
    setChoices(choicesShadow);
  }
  
  const updateCheckboxValueAndClearOthers = (id, val) => {
      let choicesShadow = choices.map(item => item.id == id ? {
          ...item,
          votes: val ? item.votes+1 : item.votes-1,
          checkbox: {...item.checkbox, isChecked: val}
        } : {
          ...item,
          votes: item.checkbox.isChecked ? item.votes-1 : item.votes,
          checkbox: {...item.checkbox, isChecked: false}
        }
      );
      const votes = new Map(choicesShadow.map(it => [it.id, it.votes]));
      const newWinningVotes = Math.max(...votes.values());
      choicesShadow = choicesShadow.map(it => ({...it, isWinning: votes.get(it.id) === newWinningVotes }));
      setChoices(choicesShadow);
  }

  const onSelectCheckboxChange = (event) => {
    if(config.isMultiple === "false") {
      updateCheckboxValueAndClearOthers(event.target.id, event.target.checked);
    } else if (config.isMultiple === "true") {
      updateCheckboxValue(event.target.id, event.target.checked);
    }   
  }
  
  return (
    <>
      
        <Stack>
            <Heading as="h3">{config.name}</Heading>

            {isCompMounted ? (
              choices.map((v, i) => {
              if (!v.question) return null;
              return (<React.Fragment key={i} >
                  <Stack>
                  <Inline space="space.200" alignBlock="baseline">
                      <Heading as="h5">{v.question}</Heading>
                      <Inline>
                      <Tag text={`${v.votes} votes`} color={v.isWinning && v.votes ? "greenLight" : "standard"}> </Tag>
                      <Button onClick={() => onOpenModal(i)}
                          spacing="compact"
                          iconBefore="person"
                          appearance="subtle"
                          isDisabled={config.isPrivate == "false"}
                      > </Button>
                      </Inline>
                  </Inline>
                  
                  <Inline alignBlock="baseline" spread='space-between'>
                      <Inline space="space.200" alignBlock="center">
                      <Checkbox id={i}
                          name={v.checkbox.name}
                          isChecked={v.checkbox.isChecked}
                          onChange={onSelectCheckboxChange}>
                      </Checkbox>

                      <Box xcss={{ width: Math.pow(Math.log(v.votes*1.2), 2) * 20 + 30, height: '20px',  backgroundColor: colorMap.get(i) }}> </Box>
                      </Inline>
                  </Inline>

                  </Stack>
              </React.Fragment>);
              })
            ) : <Spinner size="medium" />}
            <UsersVoteModal isOpenModal={isOpenModal} closeModal={closeModal} modalData={modalData}/>
        </Stack>
    </>
  );
};

export default OpenedPool;