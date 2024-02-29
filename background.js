chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    const blockedWebsites = [
      "leetcode.com",
      "hackerrank.com",
      "codeforces.com",
    ];
    if (blockedWebsites.some((website) => tab.url.includes(website))) {
      // Retry the action after a short delay if it fails
      setTimeout(() => {
        chrome.tabs.update(tabId, { selected: true }, () => {
          if (chrome.runtime.lastError) {
            const errorMessage = chrome.runtime.lastError.message;
            console.error("Error updating tab:", errorMessage);
            // Check if the error is due to tab dragging
            if (errorMessage.includes("dragging a tab")) {
              console.log("User may be dragging a tab, skipping retry.");
            } else {
              // Retry the action after a longer delay
              setTimeout(() => {
                chrome.tabs.update(tabId, { active: true }, () => {
                  if (chrome.runtime.lastError) {
                    console.error(
                      "Retry error updating tab:",
                      chrome.runtime.lastError.message
                    );
                    // Handle the retry error or further retry if necessary
                  }
                });
              }, 1000); // Retry after 1 second (1000 milliseconds)
            }
          }
        });
      }, 1000); // Retry after 1 second (1000 milliseconds)
    }
  });
});
