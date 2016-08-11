import { HTTP } from 'meteor/http'
import { Template } from 'meteor/templating'

Template.uiGenerateSDKModal.helpers({
    'languages' () {
        return languageList;
    }
});

Template.uiGenerateSDKModal.events({
    // Create POST request to swagger
    'click #download': function(event, template) {
        //Read selected language
        var selectedLanguage = template.find("[name=selectLanguageDropdown]").selectedOptions[0].value;

        //Read path to file
        var pathToFile = template.find("[name=linkToDocumantation]").value;

        //Create URL to send request
        var url = "https://generator.swagger.io/api/gen/clients/" + selectedLanguage.toLowerCase();
        
        //Create post options
        var options = {
            "swaggerUrl": pathToFile
        };
        
        // POST request
        HTTP.post(url, { data: options }, function(err, result) { 
            var response = JSON.parse(result.content); 
            window.location.href = response.link; 
        });
    }    
});