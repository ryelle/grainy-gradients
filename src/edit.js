/**
 * WordPress dependencies
 */
import {
	InspectorControls,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import {
	/* eslint-disable import/named */
	CustomGradientPicker,
	PanelBody,
	ResizableBox,
	UnitControl,
	/* eslint-enable import/named */
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';

// Non-experimental as of Gutenberg plugin v11.1.0, experimental in WP 5.8.2.
if ( ! CustomGradientPicker ) {
	CustomGradientPicker = wp.components.__experimentalCustomGradientPicker;
}

// Still experimental as of GB v 11.9.1 + WP 5.8.2.
if ( ! UnitControl ) {
	UnitControl = wp.components.__experimentalUnitControl;
}

/**
 * Internal dependencies
 */
import { DEFAULT_GRADIENT } from './utils';

const MIN_HEIGHT = 1;
const MAX_HEIGHT = 500;

export default function ( { attributes, isSelected, setAttributes } ) {
	const { height, gradient = DEFAULT_GRADIENT } = attributes;
	const [ isResizing, setIsResizing ] = useState( false );
	const { toggleSelection } = useDispatch( blockEditorStore );

	const handleOnResizeStart = () => {
		toggleSelection( false );
		setIsResizing( true );
	};

	const handleOnResizeStop = ( event, direction, elt, delta ) => {
		toggleSelection( true );
		const spacerHeight = Math.min(
			parseInt( height + delta.height, 10 ),
			MAX_HEIGHT
		);
		setAttributes( {
			height: spacerHeight,
		} );
		setIsResizing( false );
	};

	const handleOnHeightChange = ( value ) => {
		const spacerHeight = Math.min( parseInt( value, 10 ), MAX_HEIGHT );
		setAttributes( {
			height: spacerHeight,
		} );
	};

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title="Settings">
					<UnitControl
						label="Gradient Height"
						units={ [ { value: 'px', label: 'px', default: 0 } ] }
						min={ MIN_HEIGHT }
						onChange={ handleOnHeightChange }
						value={ `${ height }px` }
					/>
					<CustomGradientPicker
						value={ gradient }
						onChange={ ( newGradient ) => {
							setAttributes( { gradient: newGradient } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<ResizableBox
					size={ {
						height,
					} }
					minHeight={ MIN_HEIGHT }
					enable={ {
						top: false,
						right: false,
						bottom: true,
						left: false,
						topRight: false,
						bottomRight: false,
						bottomLeft: false,
						topLeft: false,
					} }
					onResizeStart={ handleOnResizeStart }
					onResizeStop={ handleOnResizeStop }
					showHandle={ isSelected }
					__experimentalShowTooltip={ true }
					__experimentalTooltipProps={ {
						axis: 'y',
						position: 'bottom',
						isVisible: isResizing,
					} }
				>
					<div
						className="wp-block-ryelle-grainy-gradient__gradient"
						style={ { '--gradient': gradient } }
					/>
				</ResizableBox>
			</div>
		</>
	);
}
