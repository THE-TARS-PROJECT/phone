package com.cooper.phone

import android.content.Intent
import android.telecom.Call
import android.telecom.InCallService

class InCall: InCallService() {

    override fun onCallAdded(call: Call?) {
        super.onCallAdded(call)
    }
}