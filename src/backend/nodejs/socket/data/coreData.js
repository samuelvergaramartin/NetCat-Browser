const core_responses = {
    locations: {
        control_unit: "control-unit"
    },
    messages: {
        success: "OK",
        error: "ERROR"
    },
    status: {
        success: 200,
        error: 400
    }
};
const locations = {
    control_unit: "control-unit",
    start_file: "start_file",
    browser_page: "browser-page",
    bridge: "bridge"
}
const NetCatBrowserEvents = {
    core_ready: "core_ready",
    starting_app: "starting_app",
    "app_started": "app_started",
    "core-response": "core-response"
}

module.exports = { core_responses, locations, NetCatBrowserEvents };