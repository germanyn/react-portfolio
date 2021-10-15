import React, { useState, useEffect } from 'react';
import throttle from 'lodash.throttle';

export interface useScrollSpyParams {
  activeSectionDefault?: number,
  offsetPx?: number,
  sectionElementRefs: React.RefObject<HTMLElement>[],
  throttleMs?: number,
  scrollElementRef?: React.RefObject<HTMLElement>,
}
export default ({
  activeSectionDefault = 0,
  offsetPx = 0,
  sectionElementRefs = [],
  throttleMs = 100,
  scrollElementRef,
}: useScrollSpyParams ) => {
  const [activeSection, setActiveSection] = useState(activeSectionDefault);

  const [currentScrollElementRef, setCurrenScrollElementRef] = useState(null)

  const handle = throttle(() => {
    let currentSectionId = activeSection;
    for (let i = 0; i < sectionElementRefs.length; i++) {
      const section = sectionElementRefs[i].current;
      // Needs to be a valid DOM Element
      if (!section || !(section instanceof Element)) continue;
      // GetBoundingClientRect returns values relative to viewport
      if (section.getBoundingClientRect().top + offsetPx < 0) {
        currentSectionId = i;
        continue;
      }
      // No need to continue loop, if last element has been detected
      break;
    }

    setActiveSection(currentSectionId);
  }, throttleMs);

  useEffect(() => {
    const scrollElement = scrollElementRef
      ? scrollElementRef.current
      : window
    if (!scrollElement) {
      console.warn('Element ref is null, scrollspy will not take any effect')
      return
    }
    scrollElement.addEventListener('scroll', handle);

    // Run initially
    handle();

    return () => {
      scrollElement.removeEventListener('scroll', handle);
    };
  }, [sectionElementRefs, offsetPx, scrollElementRef]);
  return activeSection;
};
