import menubar from './MENUBAR.js';
import toolbar from './TOOLBAR.js';
import FORMATTING_TOOLBAR from './FORMATTING_TOOLBAR.js';
import footer from './FOOTER.js';

export default function renderFeatures() {
	menubar(); // Render menu bar

	FORMATTING_TOOLBAR();

	toolbar(); // Render tools section

	footer(); // Generate footer component
}