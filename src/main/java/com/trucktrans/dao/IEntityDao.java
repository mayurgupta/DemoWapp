/**
 * 
 */
package com.trucktrans.dao;

import java.io.Serializable;
import java.util.List;

/**
 * @author Mayur
 * 4:52:25 pm, 20-Sep-2015
 *
 * @param <T>
 * @param <K>
 *
 */
public interface IEntityDao<T, K extends Serializable> {

    /**
     * 
     * @param transientInstance
     */
    void persist(T transientInstance);

    /**
     * 
     * @param persistentInstance
     */
    void delete(T persistentInstance);

    /**
     * merge object
     * 
     * @param detachedInstance
     * @return
     */
    T merge(T detachedInstance);

    /**
     * get all objects
     * 
     * @return
     */
    List<T> getAll();

    /**
     * get all objects<br>
     * support for pagination
     * 
     * @param limit
     * @param offset
     * @return
     */
    List<T> getAll(int limit, int offset);

    /**
     * find object by given object instance
     * 
     * @param instance
     * @return
     */
    List<T> findByExample(T instance);

    /**
     * attach this instance to current session<br>
     * should not force update to db. Should be only used when u r sure that
     * object is not modified outside the session.<br>
     * 
     * for db update use merge.
     * 
     * @param instance
     */
    void attachToSession(T instance);

    /**
     * get object by id
     * 
     * @param id
     * @return
     */
    T getById(K id);

    /**
     * update object
     * 
     * @param detachedInstance
     * @return
     */
    void update(T detachedInstance);

    /**
     * save object
     * 
     * @param detachedInstance
     * @return
     */
    K save(T detachedInstance);

    /**
     * save object
     * 
     * @param instance
     * @return
     */
    boolean isDetached(T instance);

}