<?php

namespace Drupal\work_logging;

use Drupal\Core\Session\AccountInterface;
use Symfony\Component\DependencyInjection\ContainerAwareInterface;
use Drupal\Core\Database\Connection;

class WorkLogger {

  /** @var Connection */
  private $database;

  /** @var AccountInterface */
  private $current_user;

  public function __construct(Connection $database, AccountInterface $current_user) {
    $this->database = $database;
    $this->current_user = $current_user;
  }

  public function checkIn() {
    $now = new \DateTime();
    $this->database->merge('user_work_time')
      ->fields([
        'uid' => $this->current_user->id(),
        'start_time' => $now->getTimestamp(),
        'work_year' => $now->format('Y'),
        'work_month' => $now->format('n'),
        'work_day' => $now->format('j'),
      ])
      ->condition('work_year', $now->format('Y'))
      ->condition('work_month', $now->format('n'))
      ->condition('work_day', $now->format('j'))
      ->condition('uid', $this->current_user->id())
      ->execute();
  }

  public function checkOut() {
    $now = new \DateTime();
    $this->database->merge('user_work_time')
      ->fields([
        'uid' => $this->current_user->id(),
        'end_time' => $now->getTimestamp(),
        'work_year' => $now->format('Y'),
        'work_month' => $now->format('n'),
        'work_day' => $now->format('j'),
      ])
      ->condition('work_year', $now->format('Y'))
      ->condition('work_month', $now->format('n'))
      ->condition('work_day', $now->format('j'))
      ->condition('uid', $this->current_user->id())
      ->execute();
  }

}
