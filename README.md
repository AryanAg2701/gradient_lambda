# gradient_lambda

To run the rogram use node_modules and "npm run dev" in Terminal.

It is a only frontend project that gives the preview as well as the css code for customizable gradient and has various functions to make and alter it completely at will.

It has many features in the starting the list of colors is displayed to the left it has colour input which can change colour.
in the middle a slidebar which adjust the percentage of area covered by that color when the percentage of a color increases or decreases than any other they swap places in the display only (not in list).
only if there are more than 2 colors a remove button appears colors can be removed and colors below it come up in list.

Then there is Add color button which will give by default white color at 50% (can be changed ofc).

Next option can be usd to change gradient type linear or radial.
on linear an extra option appears for changing angle.
there is a circle which conatains a knob , mousemove function handles the change of position of mouse with respect to the centre cordinates of circle as X and Y cordinates and calculates angle using tan inverse dy/dx and display it. Green knobs moves along with mouse and cant go outside circle.
On left angle can be input manually, it does convert into nearest integer value between 0 and 360.

Next is the display window followed by the css code

note: for sharp edges the perecentage of 2 colors is made equal. difference in percentage is proportional to diffusion
