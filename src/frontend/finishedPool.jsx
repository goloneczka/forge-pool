import React, { useEffect, useState  } from 'react';
import ForgeReconciler, { useConfig, RadioGroup, Stack, xcss, Box, Heading, Inline, Tag, Button, Text, Em } from '@forge/react';
import defaultConfig  from './config';
import { invoke } from '@forge/bridge';
import { view } from '@forge/bridge';
import  colorMap  from './colors';
import UsersVoteModal from './usersVoteModal';


const FinishedPool = () => {
    const [context, setContext] = useState(undefined);
    const [choices, setChoices] = useState([]);
    const [isOpenModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const config = useConfig() || defaultConfig;

    useEffect(() => {
        view.getContext().then(setContext);
      }, [view]);

    useEffect(() => {
        if(context !== undefined) {
          invoke('getAllOutputs').then(allChoices => {
              const votes = new Map([[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0]])
              allChoices.map(it => {it.value.map(v => votes.set(v, votes.get(v)+1))});
              const winningVotes = Math.max(...votes.values());

              setChoices(_ => [
              { id: 0, question: config.question_0, votes: votes.get(0), isWinning: winningVotes === votes.get(0)},
              { id: 1, question: config.question_1, votes: votes.get(1), isWinning: winningVotes === votes.get(1)},
              { id: 2, question: config.question_2, votes: votes.get(2), isWinning: winningVotes === votes.get(2)},
              { id: 3, question: config.question_3, votes: votes.get(3), isWinning: winningVotes === votes.get(3)},
              { id: 4, question: config.question_4, votes: votes.get(4), isWinning: winningVotes === votes.get(4)},
              { id: 5, question: config.question_5, votes: votes.get(5), isWinning: winningVotes === votes.get(5)},
              { id: 6, question: config.question_6, votes: votes.get(6), isWinning: winningVotes === votes.get(6)},
              { id: 7, question: config.question_7, votes: votes.get(7), isWinning: winningVotes === votes.get(7)},
              { id: 8, question: config.question_8, votes: votes.get(8), isWinning: winningVotes === votes.get(8)},
              { id: 9, question: config.question_9, votes: votes.get(9), isWinning: winningVotes === votes.get(9)}
              ]);
          });
        } 
    }, [config, context]);

    const onOpenModal = (choosenId) => {
        invoke('getOutputVouters', choosenId).then(data => {
          setModalData({userIds: data, question: choices[choosenId].question});
          setOpenModal(true);
        });
    };

    const closeModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <Stack>
              <Inline space="space.200" alignBlock="baseline">
                <Heading as="h3">{config.name}</Heading>
                <Text> <Em>completed questionnaire</Em></Text>
              </Inline>

              {choices.map((v, i) => {
                if (!v.question) return null;
                return (<React.Fragment key={i} >
                  <Stack>
                    <Inline space="space.200" alignBlock="baseline">
                      <Heading as="h5">{v.question}</Heading>
                      <Inline>
                        <Tag text={`${v.votes} votes`} color={v.isWinning ? "greenLight" : "standard"}> </Tag>
                        <Button onClick={() => onOpenModal(i)}
                          spacing="none"
                          iconBefore="person"
                          appearance="subtle"
                          isDisabled={config.isPrivate == "false"}
                        > </Button>
                      </Inline>
                    </Inline>
                    
                    <Inline alignBlock="baseline" spread='space-between'>
                        <Box xcss={{ width: Math.pow(Math.log(v.votes*1.2), 2) * 20 + 30,
                             height: '20px',
                             backgroundColor: v.isWinning ? colorMap.get(i) : 'color.background.accent.gray.subtlest.pressed' }}> </Box>
                    </Inline>

                  </Stack>
                </React.Fragment>);
              })}
              <UsersVoteModal isOpenModal={isOpenModal} closeModal={closeModal} modalData={modalData}/>
            </Stack>
        </>
    );
};

export default FinishedPool;