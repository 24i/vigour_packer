"use strict";
console.log('### Application Loaded. Starting system.');

/**
 * Sets the log verbosity level.
 * Debug logging (all messages).
 * DEBUG
 * Verbose logging (sender messages).
 * VERBOSE
 * Info logging (events, general logs).
 * INFO
 * Error logging (errors).
 * ERROR
 * No logging.
 * NONE
 **/

// cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);
// window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

// window.castReceiverManager.onReady = function(event) {
//     console.error("### Cast Receiver Manager is READY: " + JSON.stringify(event));
//     window.sessionId = event.data.sessionId
//     console.log('WINDOW sessionId' ,window.sessionId)
// } // 10 minutes for testing, use default 10sec in prod by not setting this value
// window.castReceiverManager.start(appConfig);

(function () {
    var mgr
    ,   appConfig

    window.onload = function () {

        cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG);

        mgr = cast.receiver.CastReceiverManager.getInstance();

        appConfig = new cast.receiver.CastReceiverManager.Config();
        appConfig.statusText = '';
        appConfig.maxInactivity = 6000;
        mgr.onReady = function(event) {
            console.error("### Cast Receiver Manager is READY: " + JSON.stringify(event));
            window.sessionId = event.data.sessionId
        }
        mgr.start();
    }
})();