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
 * Internal dependencies
 */
import { useTransformHandler } from '../../components/transform';
import generatePatternStyles from '../../utils/generatePatternStyles';
import convertToCSS from '../../utils/convertToCSS';

function useColorTransformHandler({ id, targetRef, expectedStyle }) {
  useTransformHandler(id, (transform) => {
    const target =
      undefined !== targetRef?.current ? targetRef.current : targetRef;
    if (target) {
      if (transform === null) {
        target.style.cssText = '';
      } else {
        const { color, style } = transform;
        // If the transforming style and the expected style don't match, return.
        if (expectedStyle && expectedStyle !== style) {
          return;
        }
        if (color && style) {
          // In case we're changing text color, we need the first child instead of the element itself.
          if ('color' === style && target.children?.[0]) {
            target.children[0].style.cssText = convertToCSS(
              generatePatternStyles(color, style)
            );
          } else {
            target.style.cssText = convertToCSS(
              generatePatternStyles(color, style)
            );
          }
        }
      }
    }
  });
}

export default useColorTransformHandler;
