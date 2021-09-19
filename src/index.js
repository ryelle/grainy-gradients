/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Edit from './edit';
import { DEFAULT_GRADIENT } from './utils';
import './style.scss';

registerBlockType( 'ryelle/grainy-gradient', {
	edit: Edit,

	save: ( { attributes } ) => {
		const { height, gradient = DEFAULT_GRADIENT } = attributes;
		return (
			<div
				{ ...useBlockProps.save( {
					style: {
						height,
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
} );
