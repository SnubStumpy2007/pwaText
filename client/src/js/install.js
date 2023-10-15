const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt
  event.preventDefault();

  // Store the event for later use
  deferredPrompt = event;

  // Show your custom install button or message
  // For example, make your install button visible
  butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
      // Show the browser's installation prompt
      deferredPrompt.prompt();
  
      // Wait for the user to respond
      const choiceResult = await deferredPrompt.userChoice;
  
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA installation');
      } else {
        console.log('User declined the PWA installation');
      }
  
      // Reset deferredPrompt to null
      deferredPrompt = null;
    }
  
    // Hide the custom install button
    butInstall.style.display = 'none';
  });
  

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully');
    // You can add any post-installation logic here
  });
  
