// Viewport Center on Selection - viewport-center-selection.jsx

// Description:
// ... it uhh centers the viewport on selection at 100%

var
  objectX = 0,
  objectY= 0,
  docSelection,
  geometricBounds,
  topL_X = 0,
  topL_Y = 0,
  botR_X = 0,
  botR_Y = 0,
  selection = app.activeDocument.selection,
  artboard = app.activeDocument.artboards[app.activeDocument.artboards.getActiveArtboardIndex()];

if (selection.length > 0) {

    if (selection.length > 1) {
        for (var i = selection.length - 1; i >= 0; i--) {


            geometricBounds = selection[i].geometricBounds;

            topL_X_temp = geometricBounds[0];
            topL_Y_temp = geometricBounds[1];
            botR_X_temp = geometricBounds[2];
            botR_Y_temp = geometricBounds[3];

            topL_X = topL_X ? topL_X : topL_X_temp;
            topL_Y = topL_Y ? topL_Y : topL_Y_temp;
            botR_X = botR_X ? botR_X : botR_X_temp;
            botR_Y = botR_Y ? botR_Y : botR_Y_temp;

            if (topL_X_temp < topL_X) {topL_X = topL_X_temp; }
            if (topL_Y_temp < topL_Y) {topL_Y = topL_Y_temp; }
            if (botR_X_temp > botR_X) {botR_X = botR_X_temp; }
            if (botR_Y_temp > botR_Y) {botR_Y = botR_Y_temp; }

        }

        objectX = (topL_X + botR_X) / 2;
        objectY = (topL_Y + botR_Y) / 2;
    } else {

        geometricBounds = selection[0].geometricBounds;

        objectX = (geometricBounds[0] + geometricBounds[2]) / 2;
        objectY = (geometricBounds[1] + geometricBounds[3]) / 2;
    }

} else {
        // Get the Height of the Artboard
    objectX = (artboard.artboardRect[0] + artboard.artboardRect[2]) / 2;
    objectY = (artboard.artboardRect[1] + artboard.artboardRect[3]) / 2;

}

// set zoom level
app.documents[0].views[0].zoom = 1;

// set viewport centerpoint
app.documents[0].views[0].centerPoint = [objectX,objectY];
