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

var textRef, paraAttr, paragraphs, geo, position;

function textJustLeft(el, textObject) {
	// resize used here as workaround for adobe text align left scripting bug.
	// otherwise the justification remains unchanged.
	el.resize(1000.0,1000.0);
	textObject.justification = Justification.LEFT; // set alignment
	el.resize(10.0,10.0);
	return;
}

if (selection.length > 0) {

	// for selected text:
	for (var i = selection.length - 1; i >= 0; i--) {
		geo = selection[i].geometricBounds;   // get bounds
		position = selection[i].position;     // get position
		paragraphs = selection[i].paragraphs;

		for (var j = paragraphs.length - 1; j >= 0; j--) {
			paraAttr = paragraphs[j].paragraphAttributes;
			textJustLeft(selection[i], paraAttr);
		}

		// set new position
		selection[i].position = position;

	}

}
