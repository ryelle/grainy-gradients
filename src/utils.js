export const DEFAULT_GRADIENT =
	'linear-gradient(180deg,rgb(94,7,227) 0%,rgb(255,255,255) 100%)';

export const DEFAULT_TYPE = 'default';

function getFrequency( type = DEFAULT_TYPE ) {
	switch ( type ) {
		case 'horizontal':
			return '0.001 0.8';
		case 'vertical':
			return '0.8 0.001';
		case 'blob':
			return '0.015';
		default:
			return '0.6';
	}
}

export function getTexture( { height, type } ) {
	const size = height * 2;
	const freq = getFrequency( type );

	const svg = `<svg viewBox='0 0 100% ${ size }' xmlns='http://www.w3.org/2000/svg'>
		<filter id='noiseFilter'>
			<feTurbulence
				type='fractalNoise'
				baseFrequency='${ freq }'
				numOctaves='2'
				stitchTiles='stitch' />
		</filter>
		<rect width='100%' height='100%' filter='url(#noiseFilter)'/>
	</svg>`;

	return `url("data:image/svg+xml,${ encodeURIComponent( svg ) }")`;
}
