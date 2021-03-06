<?php

/**
 * @file
 * Contains \Drupal\tmgmt_config\Controller\ConfigTranslationControllerOverride.
 */

namespace Drupal\tmgmt_config\Controller;

use Drupal\config_translation\Controller\ConfigTranslationController;
use Drupal\Core\Routing\RouteMatchInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Overridden class for entity translation controllers.
 */
class ConfigTranslationControllerOverride extends ConfigTranslationController {

  /**
   * {@inheritdoc}
   */
  public function itemPage(Request $request, RouteMatchInterface $route_match, $plugin_id) {
    $build = parent::itemPage($request, $route_match, $plugin_id);
    if (\Drupal::entityManager()->getAccessControlHandler('tmgmt_job')->createAccess()) {
      $build = \Drupal::formBuilder()->getForm('Drupal\tmgmt_config\Form\ConfigTranslateForm', $request, $build, $plugin_id);
    }
    return $build;
  }

}
