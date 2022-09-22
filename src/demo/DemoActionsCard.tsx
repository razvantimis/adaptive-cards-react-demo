import { AdaptiveCard } from "adaptivecards-react";
import { hostConfig } from "../constants";
import * as ACData from "adaptivecards-templating";

const cardTemplate = {
  "type": "AdaptiveCard",
  "body": [
      {
          "type": "TextBlock",
          "size": "Medium",
          "weight": "Bolder",
          "text": "${title}"
      },
      {
          "type": "ColumnSet",
          "columns": [
              {
                  "type": "Column",
                  "items": [
                      {
                          "type": "Image",
                          "style": "Person",
                          "url": "${creator.profileImage}",
                          "size": "Small"
                      }
                  ],
                  "width": "auto"
              },
              {
                  "type": "Column",
                  "items": [
                      {
                          "type": "TextBlock",
                          "weight": "Bolder",
                          "text": "${creator.name}",
                          "wrap": true
                      },
                      {
                          "type": "TextBlock",
                          "spacing": "None",
                          "text": "Created {{DATE(${createdUtc},SHORT)}}",
                          "isSubtle": true,
                          "wrap": true
                      }
                  ],
                  "width": "stretch"
              }
          ]
      },
      {
          "type": "TextBlock",
          "text": "${description}",
          "wrap": true
      },
      {
          "type": "FactSet",
          "facts": [
              {
                  "$data": "${properties}",
                  "title": "${key}:",
                  "value": "${value}"
              }
          ]
      }
  ],
  "actions": [
      {
          "type": "Action.ShowCard",
          "title": "Set due date",
          "card": {
              "type": "AdaptiveCard",
              "body": [
                  {
                      "type": "Input.Date",
                      "id": "dueDate"
                  },
                  {
                      "type": "Input.Text",
                      "id": "comment",
                      "placeholder": "Add a comment",
                      "isMultiline": true
                  }
              ],
              "actions": [
                  {
                      "type": "Action.Submit",
                      "title": "OK"
                  }
              ],
              "$schema": "http://adaptivecards.io/schemas/adaptive-card.json"
          }
      },
      {
          "type": "Action.OpenUrl",
          "title": "View",
          "url": "${viewUrl}"
      },
      {
          "type": "Action.ShowCard",
          "title": "Action.ShowCard",
          "card": {
              "type": "AdaptiveCard"
          }
      },
      {
          "type": "Action.ToggleVisibility",
          "title": "Action.ToggleVisibility"
      },
      {
          "type": "Action.Execute",
          "title": "Action.Execute"
      }
  ],
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "version": "1.5"
}

// Create a Template instance from the template payload
const template = new ACData.Template(cardTemplate);
// Expand the template with your `$root` data object.
// This binds it to the data and produces the final Adaptive Card payload
const cardPayload = template.expand({
  $root: {
      "title": "Publish Adaptive Card Schema",
      "description": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
      "creator": {
          "name": "Matt Hidinger",
          "profileImage": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg"
      },
      "createdUtc": "2017-02-14T06:08:39Z",
      "viewUrl": "https://adaptivecards.io",
      "properties": [
          {
              "key": "Board",
              "value": "Adaptive Cards"
          },
          {
              "key": "List",
              "value": "Backlog"
          },
          {
              "key": "Assigned to",
              "value": "Matt Hidinger"
          },
          {
              "key": "Due date",
              "value": "Not set"
          }
      ]
  }
});

function DemoActionsCard()  {
 
  return (
    <AdaptiveCard 
    payload={cardPayload} 
    hostConfig={hostConfig} 
    
    
    />
  )
}

export default DemoActionsCard;