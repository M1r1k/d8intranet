<?php

namespace Drupal\work_logging\Controller;

use Drupal\Core\Access\AccessResultAllowed;
use Drupal\Core\Access\AccessResultForbidden;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Session\AccountInterface;
use Drupal\work_logging\WorkLogger;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\user\Entity\User;

class CheckInController extends ControllerBase {

  public function checkin(Request $request) {
    $user = User::load($this->currentUser()->id());
    /* @var WorkLogger $work_logger */
    $work_logger = \Drupal::service('work_logging.work_logger');
    $storage = \Drupal::entityManager()->getStorage('user');
    if ($user->field_working->value) {
      $user->field_working->value = 0;
      $work_logger->checkOut();
    }
    else {
      $user->field_working->value = 1;
      $work_logger->checkOut();
    }
    $storage->save($user);

    return new JsonResponse(['checked-in' => (bool) $user->field_working->value]);
  }

  public function access(AccountInterface $account) {
    return $account->isAuthenticated() ? new AccessResultAllowed() : new AccessResultForbidden();
  }

}
