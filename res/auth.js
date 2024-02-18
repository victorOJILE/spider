let undo;

window.addEventListener('DOMContentLoaded', function() {
 /*
  
  fetch('https://grp.com/data.js')
   .then(res => res.json())
   .then(projectData => {
   */
 const projectData = spiderCache || {};
 
 files = projectData.files || [{
  name: 'Project 1',
  type: 'folder',
  content: [
   {
    name: 'File 1',
    type: 'file',
    content: NewFile('File 1'),
    ref: '0:0'
   }
  ],
  ref: '0'
 }];

 SPIDER.opened_file = projectData.opened_file || (function func(files) {
  let firstFile;

  for (let key of files) {
   if (key.type === 'folder') {
    let returnVal = func(key.content);
    if (returnVal) {
     return returnVal;
    }
   } else {
    return key;
   }
  }
 })(files).ref;
 
 SPIDER.browser_view = projectData.browser_view || (SPIDER.isMobile ? 'mobile-view3' : 'fluid-view');
 
 checkFilesAndAddMissingProps(files);
 callVarUpdates();
 updateRef(project[0]);
 
 const runThroughFilesF = runThroughFiles.bind(null, files);
 
 // Load the main script
	undo = Undo();

  $(document.body).append(el('script', { type: 'module', src: '/main.js' }));
 /*
  })
  .catch(err => console.error(err));

*/
});