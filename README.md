# UVCEHackathon

You can remix this project and use the following bookmarklet[1] to trigger a restart:

    javascript:(function() {
      var currFile = application.selectedFile();
      var triggerFile = application.files().filter(function (file) {
        return file.path() === ".trigger-rebuild";
      })[0];
      if (!triggerFile) {
        alert("Please create a file named '.trigger-rebuild'.");
        return;
      }
      application.selectedFile(triggerFile);
      application.selectedFilePromise.then(function () {
        application.editor().replaceRange(
          "rebuild", { line: 0, ch: 0 }, { line: 0, ch: 10 }
        );
        application.selectedFile(currFile);
      });
    })()

[1]: A bookmarklet is a bookmark/favorite that has JavaScript code as its "URL". It lets you run scripts on the current page. Just create a bookmark and copy'n'paste the code above in its URL field.