/******************************************************************************
>> Center Viewport - Zoom to Fit (+ a little padding for aesthetics)
******************************************************************************/

var
	x_centerpoint = 0,
	y_centerpoint = 0,
	geometricBounds,
	topL_X = 0,
	topL_Y = 0,
	botR_X = 0,
	botR_Y = 0,
	selection = app.activeDocument.selection;

// get bounds
// set alignment
// set new bounds

if (selection.length == 1) {

	var textRef, paraAttr, paragraphs, geo, position;

	// for selected text:
	if (selection.length > 0) {
		for (var i = selection.length - 1; i >= 0; i--) {
			geo = selection[i].geometricBounds;
			position = selection[i].position;
			paragraphs = selection[i].paragraphs;

			for (var j = paragraphs.length - 1; j >= 0; j--) {

				paraAttr = paragraphs[j].paragraphAttributes;
				paraAttr.justification = Justification.RIGHT;

			}
			// paragraphs.setEntirePath([x,y]);
			selection[i].position = position;
		}
	}

}
