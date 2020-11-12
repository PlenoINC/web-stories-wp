/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import CircularProgress from '../../../../components/circularProgress';
import { useStory } from '../../../../app/story';

const Wrapper = styled.div`
  position: relative;

  /**
   * The wordpress default for most meta-box elements is content-box. Some
   * elements such as textarea and input are set to border-box in forms.css.
   * These elements therefore specifically set back to border-box here, while
   * other elements (such as .button) are unaffected by Gutenberg's style
   * because of their higher specificity.
   */
  &__container,
  .inside {
    box-sizing: content-box;
  }

  textarea,
  input {
    box-sizing: border-box;
  }

  /* Match width and positioning of the meta boxes. Override default styles. */
  #poststuff {
    margin: 0 auto;
    padding-top: 0;
    min-width: auto;
  }

  /* Override Default meta box stylings */
  #poststuff h3.hndle,
  #poststuff .stuffbox > h3,
  #poststuff h2.hndle {
    box-sizing: border-box;
    color: inherit;
    font-weight: 600;
    outline: none;
    padding: 15px;
    position: relative;
    width: 100%;
  }

  .postbox {
    border: 0;
    color: inherit;
    margin-bottom: 0;
  }

  .postbox .handlediv {
    height: 44px;
    width: 44px;
  }

  /**
   * Hide disabled meta boxes using CSS so that we don't interfere with plugins
   * that modify 'element.style.display' on the meta box.
   */
  .is-hidden {
    display: none;
  }
`;

const Spinner = styled.div`
  position: absolute;
  top: 10px;
  right: 100px;
  z-index: 1;
`;

function MetaBoxesArea({ location }) {
  const formRef = useRef();
  const containerRef = useRef();

  const { isSaving } = useStory(({ state }) => ({
    isSaving: state.meta.isSaving,
  }));

  useEffect(() => {
    const form = document.querySelector(`.metabox-location-${location}`);
    formRef.current = form;
    if (formRef.current && containerRef.current) {
      containerRef.current.appendChild(formRef.current);
    }

    return () => {
      document.querySelector('#metaboxes').appendChild(form);
    };
  });

  // TODO: Maybe improve UX when isSaving.
  return (
    <Wrapper className={`web-stories-meta-boxes-area-${location}`}>
      {isSaving && (
        <Spinner>
          <CircularProgress size={30} />
        </Spinner>
      )}
      <div ref={containerRef} />
    </Wrapper>
  );
}

MetaBoxesArea.propTypes = {
  location: PropTypes.string.isRequired,
};

export default MetaBoxesArea;