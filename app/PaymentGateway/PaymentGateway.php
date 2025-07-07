<?php

namespace App\PaymentGateway;

interface PaymentGateway
{
    public function redirectPayment(array $payload): array;
}
