package com.sononpos.departuresaver;

import android.support.v4.view.MotionEventCompat;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.RecyclerView.ViewHolder;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.sononpos.departuresaver.Helper.ItemTouchHelperAdapter;
import com.sononpos.departuresaver.Helper.StartDragListener;

import java.util.Collections;
import java.util.List;

/**
 * Created by nnnyyy on 2017-04-14.
 */

public class MyRecyclerAdapter extends RecyclerView.Adapter<MyRecyclerAdapter.ListItemViewHolder>
implements ItemTouchHelperAdapter {

    private List<String> mItems;
    private int itemLayout;
    StartDragListener mStartDragListener;

    public MyRecyclerAdapter(List<String> items, int itemLayout, StartDragListener listener) {
        this.mItems = items;
        this.itemLayout = itemLayout;
        this.mStartDragListener = listener;
    }

    @Override
    public MyRecyclerAdapter.ListItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType ) {
        View v = LayoutInflater.from(parent.getContext()).inflate(itemLayout, parent, false);
        ListItemViewHolder newHolder = new ListItemViewHolder(v);
        return newHolder;
    }

    @Override
    public void onBindViewHolder(final ListItemViewHolder holder, int position) {
        holder.label.setText(mItems.get(position));
        holder.dragArea.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if(MotionEventCompat.getActionMasked(event) == MotionEvent.ACTION_DOWN) {
                    //  ItemTouchHelper의 도움을 받아야 함.
                    mStartDragListener.OnStartDrag(holder);
                }
                return false;
            }
        });
    }

    @Override
    public int getItemCount() {
        return mItems.size();
    }

    @Override
    public boolean onItemMove(int fromPosition, int toPosition) {
        Collections.swap(mItems, fromPosition,toPosition);
        notifyItemMoved(fromPosition,toPosition);
        return true;
    }

    public final static class ListItemViewHolder extends RecyclerView.ViewHolder {
        TextView label;
        TextView dragArea;

        public ListItemViewHolder(View itemView) {
            super(itemView);
            label = (TextView)itemView.findViewById(R.id.my_text_view);
            dragArea = (TextView)itemView.findViewById(R.id.my_drag_area);
        }
    }
}
