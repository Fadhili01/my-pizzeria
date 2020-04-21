function closeHandler() {
    Enabler.reportManualClose(); 
    Enabler.close();
  }
  
document.getElementById('close-btn').addEventListener('click', closeHandler, false);