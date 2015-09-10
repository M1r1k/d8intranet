<?php

/**
 * @file
 * Contains \Drupal\intranet_helper\Plugin\Field\FieldType\UserStatusesItem.
 */

namespace Drupal\intranet_helper\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldDefinitionInterface;
use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Base class for 'text' configurable field types.
 *
 * @FieldType(
 *   id = "user_statuses",
 *   label = @Translation("List of user statuses for current day"),
 *   description = @Translation("This field is memory only and will be populated on user load."),
 *   category = @Translation("Text"),
 *   default_widget = "text_textfield",
 *   default_formatter = "text_default"
 * )
 */
class UserStatusesItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['day_off'] = DataDefinition::create('boolean');
    $properties['sick'] = DataDefinition::create('boolean');
    $properties['business_trip'] = DataDefinition::create('boolean');
    $properties['remote_work'] = DataDefinition::create('boolean');
    $properties['vacation'] = DataDefinition::create('boolean');

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public function applyDefaultValue($notify = TRUE) {
    // Default to a simple \Drupal\Component\Utility\SafeMarkup::checkPlain().
    // @todo: Add in the filter default format here.
    $this->setValue([
      'day_off' => FALSE,
      'sick' => FALSE,
      'business_trip' => FALSE,
      'remote_work' => FALSE,
      'vacation' => FALSE,
    ], $notify);
    return $this;
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public static function generateSampleValue(FieldDefinitionInterface $field_definition) {
    $values = array(
      'day_off' => (bool) rand(0,1),
      'sick' => (bool) rand(0,1),
      'business_trip' => (bool) rand(0,1),
      'remote_work' => (bool) rand(0,1),
      'vacation' => (bool) rand(0,1),
    );
    return $values;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return array(
      'columns' => array(
        'day_off' => array(
          'type' => 'int',
          'unsigned' => TRUE,
        ),
        'sick' => array(
          'type' => 'int',
          'unsigned' => TRUE,
        ),
        'business_trip' => array(
          'type' => 'int',
          'unsigned' => TRUE,
        ),
        'remote_work' => array(
          'type' => 'int',
          'unsigned' => TRUE,
        ),
        'vacation' => array(
          'type' => 'int',
          'unsigned' => TRUE,
        ),
      ),
    );
  }
}
