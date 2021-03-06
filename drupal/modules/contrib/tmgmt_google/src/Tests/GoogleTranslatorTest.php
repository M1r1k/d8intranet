<?php

/**
 * @file
 * Test cases for the google translator module.
 */

namespace Drupal\tmgmt_google\Tests;

use Drupal\tmgmt\Tests\TMGMTTestBase;
use Drupal\tmgmt_google\Plugin\tmgmt\Translator\GoogleTranslator;
use Drupal\tmgmt\TranslatorInterface;
use Drupal\Core\Url;

/**
 * Basic tests for the google translator.
 *
 * @group tmgmt_google
 */
class GoogleTranslatorTest extends TMGMTTestBase {

  /**
   * Modules to enable.
   *
   * @var array
   */
  public static $modules = array('tmgmt_google', 'tmgmt_google_test');

  /**
   * Tests basic API methods of the plugin.
   */
  protected function testGoogle() {
    $this->addLanguage('de');
    // Override plugin params to query tmgmt_google_test mock service instead
    // of Google Translate service.
    $url = Url::fromUri('base://tmgmt_google_test', array('absolute' => TRUE))->toString();
    $translator = $this->createTranslator([
      'plugin' => 'google',
      'settings' => ['url' => $url],
    ]);

    $plugin = $translator->getPlugin();
    $this->assertTrue($plugin instanceof GoogleTranslator, 'Plugin is a GoogleTranslator');

    $job = $this->createJob();
    $job->translator = $translator->id();
    $item = $job->addItem('test_source', 'test', '1');
    $item->data = array(
      'wrapper' => array(
        '#text' => 'Hello world',
      ),
    );
    $item->save();

    $this->assertFalse($job->isTranslatable(), 'Check if the translator is not available at this point because we did not define the API parameters.');

    // Save a wrong api key.
    $translator->setSetting('api_key', 'wrong key');
    $translator->save();

    $languages = $translator->getSupportedTargetLanguages('en');
    $this->assertTrue(empty($languages), t('We can not get the languages using wrong api parameters.'));

    // Save a correct api key.
    $translator->setSetting('api_key', 'correct key');
    $translator->save();

    // Make sure the translator returns the correct supported target languages.
    $translator->clearLanguageCache();
    $languages = $translator->getSupportedTargetLanguages('en');

    $this->assertTrue(isset($languages['de']));
    $this->assertTrue(isset($languages['fr']));
    // As we requested source language english it should not be included.
    $this->assertTrue(!isset($languages['en']));

    $this->assertTrue($job->canRequestTranslation());

    $job->requestTranslation();

    // Now it should be needs review.
    foreach ($job->getItems() as $item) {
      $this->assertTrue($item->isNeedsReview());
    }
    $items = $job->getItems();
    $item = end($items);
    $data = $item->getData();
    $this->assertEqual('Hallo Welt', $data['dummy']['deep_nesting']['#translation']['#text']);
  }
}
