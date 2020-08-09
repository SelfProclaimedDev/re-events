import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

export default function LoadingComponent({inverted=true,content='Loading...'}) {
    return (
        <div>
            <Dimmer inverted={inverted} active={true}>
                <Loader content={content}/>
            </Dimmer>
        </div>
    )
}
