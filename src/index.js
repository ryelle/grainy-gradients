/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Edit from './edit';
import { DEFAULT_GRADIENT, DEFAULT_TYPE, getTexture } from './utils';
import './style.scss';
import settings from '../block.json';

registerBlockType( 'ryelle/grainy-gradient', {
	...settings,
	edit: Edit,
	save: ( { attributes } ) => {
		const { height, gradient = DEFAULT_GRADIENT } = attributes;
		return (
			<div
				{ ...useBlockProps.save( {
					style: {
						height,
						'--texture': getTexture( attributes ),
					},
				} ) }
			>
				<div
					className="wp-block-ryelle-grainy-gradient__gradient"
					style={ { '--gradient': gradient } }
				/>
			</div>
		);
	},
	variations: [
		{
			name: 'default',
			title: __( 'Default Grain', 'grainy-gradient' ),
			isDefault: true,
			attributes: { type: DEFAULT_TYPE },
			scope: [ 'transform' ],
			isActive: ( blockAttributes, variationAttributes ) =>
				blockAttributes.type === variationAttributes.type,
		},
		{
			name: 'horizontal',
			title: __( 'Horizontal Grain', 'grainy-gradient' ),
			attributes: { type: 'horizontal' },
			scope: [ 'transform' ],
			isActive: ( blockAttributes, variationAttributes ) =>
				blockAttributes.type === variationAttributes.type,
		},
		{
			name: 'vertical',
			title: __( 'Vertical Grain', 'grainy-gradient' ),
			attributes: { type: 'vertical' },
			scope: [ 'transform' ],
			isActive: ( blockAttributes, variationAttributes ) =>
				blockAttributes.type === variationAttributes.type,
		},
		{
			name: 'blob',
			title: __( 'Blobby Grain', 'grainy-gradient' ),
			attributes: { type: 'blob' },
			scope: [ 'transform' ],
			isActive: ( blockAttributes, variationAttributes ) =>
				blockAttributes.type === variationAttributes.type,
		},
	],
} );
