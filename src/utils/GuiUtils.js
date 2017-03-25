import Promise from 'promise-polyfill';
import ReactDOM from 'react-dom';

/*
    Set focus on given node
*/
export const focusOnNode = (node) => {
    const el = ReactDOM.findDOMNode(node);
    if (el !== null) {
        el.focus();
    }
};

/*
    Get an element in the root node
    Returns a Promise with the element, or rejected if element not found
*/
export const getElement = (rootNodeId, elementSelector) => {
    const rootEl = document.getElementById(rootNodeId);

    return new Promise((resolve, reject) => {
        if (rootEl === null) {
            reject(`Root-Node "${rootNodeId}" not found`);
        }
        window.setTimeout(() => {
            const el = rootEl.querySelector(elementSelector);
            if (el === null) {
                reject(`Element "${elementSelector}" not found`);
                return;
            }
            resolve(el);
            return;
        }, 0);
    });
};

/*
    From http://stackoverflow.com/a/25574313
    Smoothly scroll element to the given target (element.scrollTop)
    for the given duration
    Returns a promise that's fulfilled when done, or rejected if
    interrupted
 */
export const scrollTo = function(element, target, duration) {
    target = Math.round(target);
    duration = Math.round(duration);
    if (duration < 0) {
        return Promise.reject("bad duration");
    }
    if (duration === 0) {
        element.scrollTop = target;
        return Promise.resolve();
    }

    const startTime = Date.now();
    const endTime = startTime + duration;

    const startTop = element.scrollTop;
    const distance = target - startTop;

    // based on http://en.wikipedia.org/wiki/Smoothstep
    const smoothStep = function(start, end, point) {
        if (point <= start) { return 0; }
        if (point >= end) { return 1; }
        const x = (point - start) / (end - start); // interpolation
        return x * x * (3 - 2 * x);
    };

    return new Promise(function(resolve, reject) {
        // This is to keep track of where the element's scrollTop is
        // supposed to be, based on what we're doing
        let previousTop = element.scrollTop;

        // This is like a think function from a game loop
        const scrollFrame = function() {
            if (element.scrollTop !== previousTop) {
                console.log(element.scrollTop, previousTop);
                reject("interrupted");
                return;
            }

            // set the scrollTop for this frame
            const now = Date.now();
            const point = smoothStep(startTime, endTime, now);
            const frameTop = Math.round(startTop + (distance * point));
            element.scrollTop = frameTop;

            // check if we're done!
            if(now >= endTime) {
                resolve();
                return;
            }

            // If we were supposed to scroll but didn't, then we
            // probably hit the limit, so consider it done; not
            // interrupted.
            if(element.scrollTop === previousTop
                && element.scrollTop !== frameTop) {
                resolve();
                return;
            }
            previousTop = element.scrollTop;

            // schedule next frame for execution
            setTimeout(scrollFrame, 0);
        };

        // boostrap the animation process
        setTimeout(scrollFrame, 0);
    });
};