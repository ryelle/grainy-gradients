<?php
/**
 * Plugin Name: Grainy Gradient Block
 * Description: A gradient with a little noise to it, this spacer block will add visual interest to your posts and pages.
 * Requires at least: 5.8
 * Requires PHP: 7.0
 * Version: 1.0.0
 * Author: ryelle
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: grainy-gradient
 */

/**
 * Register the block.
 */
function ryelle_grainy_gradient_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'ryelle_grainy_gradient_block_init' );
