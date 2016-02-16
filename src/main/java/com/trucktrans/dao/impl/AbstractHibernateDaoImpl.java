/**
 * 
 */
package com.trucktrans.dao.impl;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.LockOptions;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.springframework.beans.factory.annotation.Autowired;

import com.trucktrans.dao.IEntityDao;

/**
 * @author Mayur
 * 12:39:17 am, 13-Oct-2015
 *
 */
public class AbstractHibernateDaoImpl<T, K extends Serializable>
implements IEntityDao<T, K>  {

    private static final Logger LOGGER = Logger
            .getLogger(AbstractHibernateDaoImpl.class);

    private Class<T> clazz;

    @Autowired
    private SessionFactory sessionFactory;

    public AbstractHibernateDaoImpl(Class<T> clazz) {
        this.clazz = clazz;
    }

    public AbstractHibernateDaoImpl() {
    }

    protected SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    protected void setSessionFactory(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    protected Criteria getCriteria() {
        return getSessionFactory().getCurrentSession()
                .createCriteria(getType());
    }

    @SuppressWarnings("unchecked")
    protected Class<T> getType() {
        if (this.clazz == null) {
            java.lang.reflect.Type type = getClass().getGenericSuperclass();
            ParameterizedType paramType = (ParameterizedType) type;
            this.clazz = (Class<T>) paramType.getActualTypeArguments()[0];
        }

        return this.clazz;
    }

    /**
     * Will throw runtime exception if object is not saved
     * 
     * @param transientInstance
     *            object to save
     */
    @Override
    public void persist(T transientInstance) {
        LOGGER.debug("persisting DhCmsHospital instance");
        try {
            sessionFactory.getCurrentSession().persist(transientInstance);
            LOGGER.debug("persist successful");
        } catch (RuntimeException re) {
            LOGGER.error("persist failed", re);
            throw re;
        }
    }

    /**
     * Will throw runtime exception if object is not saved
     * 
     * @param persistentInstance
     *            object to delete
     */
    @Override
    public void delete(T persistentInstance) {
        LOGGER.debug(String.format("removing %s instance", getType()));
        try {
            sessionFactory.getCurrentSession().delete(persistentInstance);
            LOGGER.debug("remove successful");
        } catch (RuntimeException re) {
            LOGGER.error("remove failed", re);
            throw re;
        }
    }

    /**
     * this. implementation uses session.merge() to merge the two objects<br>
     * Will throw runtime exception if object is not merged
     * 
     * 
     * @param detachedInstance
     *            object to merge
     * @return
     */
    @Override
    @SuppressWarnings("unchecked")
    public T merge(T detachedInstance) {
        LOGGER.debug(String.format("merging %s instance", getType()));
        try {
            T result = (T) sessionFactory.getCurrentSession().merge(
                    detachedInstance);
            LOGGER.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            LOGGER.error("merge failed", re);
            throw re;
        }
    }

    /**
     * May throw runtime exception
     * 
     * @param id
     *            object id
     * @return object if found else null
     */
    @Override
    public T getById(K id) {
        LOGGER.debug(String.format("getting %s instance with id %s", getType(),
                id));
        try {
            @SuppressWarnings("unchecked")
            T instance = (T) sessionFactory.getCurrentSession().get(getType(),
                    id);

            if (instance == null) {
                LOGGER.debug("get successful, no instance found");
            } else {
                LOGGER.debug("get successful, instance found");
            }

            LOGGER.debug("get successful");
            return instance;
        } catch (RuntimeException re) {
            LOGGER.error("get failed", re);
            throw re;
        }
    }

    /**
     * May throw runtime exception
     * 
     * @return List of found objects
     */
    @Override
    public List<T> getAll() {
        LOGGER.debug(String.format("getting all instance of: %s", getType()));
        try {
            @SuppressWarnings("unchecked")
            List<T> results = sessionFactory.getCurrentSession()
                    .createCriteria(getType()).list();
            LOGGER.debug(String.format("get successful, result size: %d",
                    results.size()));
            return results;
        } catch (RuntimeException re) {
            LOGGER.error("get failed", re);
            throw re;
        }
    }

    /**
     * May throw runtime exception
     * 
     * @return List of found objects
     */
    @Override
    @SuppressWarnings("unchecked")
    public List<T> getAll(int limit, int offset) {
        LOGGER.debug("getting all instance of: " + getType());
        try {
            Criteria c = sessionFactory.getCurrentSession().createCriteria(
                    getType());
            if (limit > 0) {
                c.setMaxResults(limit);
            }

            if (offset >= 0) {
                c.setFirstResult(offset);
            }

            List<T> results = c.list();
            LOGGER.debug(String.format("get successful, result size: %d",
                    results.size()));
            return results;
        } catch (RuntimeException re) {
            LOGGER.error("get failed", re);
            throw re;
        }
    }

    /**
     * Uses org.hibernate.criterion.Example api to find objects
     * 
     * @param instance
     * @return List
     */
    @Override
    public List<T> findByExample(T instance) {
        LOGGER.debug("finding " + getType() + " instance by example");
        try {
            @SuppressWarnings({ "unchecked" })
            List<T> results = sessionFactory.getCurrentSession()
                    .createCriteria(getType()).add(Example.create(instance))
                    .list();
            LOGGER.debug(String.format(
                    "find by example successful, result size: %d",
                    results.size()));
            return results;
        } catch (RuntimeException re) {
            LOGGER.error("find by example failed", re);
            throw re;
        }
    }

    /**
     * attaches given object to current session<br>
     * uses session.buildlockrequest
     * 
     * @param instance
     */
    @Override
    public void attachToSession(T instance) {
        LOGGER.debug(String.format("attaching clean %s instance", getType()));
        try {
            sessionFactory.getCurrentSession()
                    .buildLockRequest(LockOptions.NONE).lock(instance);
            LOGGER.debug("attach successful");
        } catch (RuntimeException re) {
            LOGGER.error("attach failed", re);
            throw re;
        }
    }

    /**
	 * 
	 */
    @Override
    public boolean isDetached(T instance) {
        return !sessionFactory.getCurrentSession().contains(instance);
    }

    /**
     * this. implementation uses session.update() to update object into DB Will
     * throw runtime exception if object is not merged
     * 
     * 
     * @param detachedInstance
     *            object to merge
     * @return
     */
    @Override
    public void update(T detachedInstance) {
        LOGGER.debug(String.format("merging %s instance", getType()));
        try {
            sessionFactory.getCurrentSession().update(detachedInstance);
            LOGGER.debug("merge successful");
        } catch (RuntimeException re) {
            LOGGER.error("merge failed", re);
            throw re;
        }
    }

    /**
     * this. implementation uses session.save() to save object into DB Will
     * throw runtime exception if object is not merged
     * 
     * 
     * @param detachedInstance
     *            object to merge
     * @return
     */
    @Override
    @SuppressWarnings("unchecked")
    public K save(T detachedInstance) {
        LOGGER.debug(String.format("merging %s instance", getType()));
        try {
            K result = (K) sessionFactory.getCurrentSession().save(
                    detachedInstance);
            LOGGER.debug("merge successful");
            return result;
        } catch (RuntimeException re) {
            LOGGER.error("merge failed", re);
            throw re;
        }
    }
}
