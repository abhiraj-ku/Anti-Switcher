// Function to check if a URL belongs to a coding practice platform
function isCodingPlatform(url) {
  const codingPlatforms = ["leetcode.com", "hackerrank.com", "codeforces.com"];
  return codingPlatforms.some((platform) => url.includes(platform));
}

// Function to toggle tab blocking state
function toggleTabBlocking(state) {
  chrome.storage.sync.set({ tabBlockingEnabled: state });
  document.getElementById("status").innerText = state ? "Enabled" : "Disabled";
}

// Function to update UI based on tab blocking state
function updateUI() {
  chrome.storage.sync.get(["tabBlockingEnabled"], function (result) {
    const isEnabled = result.tabBlockingEnabled;
    document.getElementById("toggle").checked = isEnabled;
    document.getElementById("status").innerText = isEnabled
      ? "Enabled"
      : "Disabled";
  });
}

// Toggle tab blocking when the toggle switch is clicked
document.addEventListener("DOMContentLoaded", function () {
  // Toggle tab blocking when the toggle switch is clicked
  document.getElementById("toggle").addEventListener("change", function () {
    const isEnabled = this.checked;
    toggleTabBlocking(isEnabled);
  });
});

// Initialize UI and tab blocking state
document.addEventListener("DOMContentLoaded", function () {
  updateUI();

  // Get the current tab's URL and check if it's a coding platform
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;
    const isPlatform = isCodingPlatform(url);
    document.getElementById("currentUrl").innerText = isPlatform ? "Yes" : "No";
  });
});
