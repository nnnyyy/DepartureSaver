package com.sononpos.departuresaver;

import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.view.MenuItem;

import com.sononpos.departuresaver.SubPages.CongestionFragment;
import com.sononpos.departuresaver.SubPages.InfoFragment;
import com.sononpos.departuresaver.SubPages.ParkingFragment;

public class MainActivity extends AppCompatActivity implements ParkingFragment.OnFragmentInteractionListener, CongestionFragment.OnFragmentInteractionListener, InfoFragment.OnFragmentInteractionListener {

    final static String TAG = "DepartureSaver";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        SwitchFragment(0);

        BottomNavigationView bnv = (BottomNavigationView)findViewById(R.id.bottom_nav_view);
        bnv.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                return ProcNavItemSelect( item );
            }
        });
    }

    protected boolean ProcNavItemSelect( MenuItem item ) {
        switch(item.getItemId()) {
            case R.id.action_parking:
                SwitchFragment(0);
                break;
            case R.id.action_congestion:
                SwitchFragment(1);
                break;
            case R.id.action_info:
                SwitchFragment(2);
                break;
            default:
                SwitchFragment(0);
                break;
        }

        return true;
    }

    protected void SwitchFragment( int index ){
        FragmentManager man = getSupportFragmentManager();
        Fragment f = null;
        switch(index) {
            case 0:
                if( man.findFragmentById(R.id.action_parking) instanceof ParkingFragment ) return;
                f = ParkingFragment.newInstance("","");
                break;
            case 1:
                if( man.findFragmentById(R.id.action_congestion) instanceof CongestionFragment ) return;
                f = CongestionFragment.newInstance("","");
                break;
            case 2:
                if( man.findFragmentById(R.id.action_info) instanceof InfoFragment ) return;
                f = InfoFragment.newInstance("","");
                break;
            default:
                f = ParkingFragment.newInstance("","");
                break;
        };
        man.beginTransaction().replace(R.id.fragment_container, f).commit();
    }

    @Override
    public void onFragmentInteraction(Uri uri) {

    }
}
