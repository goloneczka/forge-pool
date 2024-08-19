import React from 'react';
import {Text, SectionMessage} from '@forge/react';

const ConfigureMacro = () => {
    return (
        <>
            <SectionMessage title="You need to configure this macro" appearance="warning"> 
                <Text>
                    While editing the page, select the macro, and click on the pencil icon
                    to display configuration options.
                </Text>
            </SectionMessage>
        </>
    );
};

export default ConfigureMacro;